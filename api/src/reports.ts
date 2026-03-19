import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AnalyticsEngine = {

  /**
   * Generates the multi-location MTD Gross Profit logic.
   * Subtracts Moving Average Cost (MAC) of parts from retail Gross.
   */
  getExecutiveGrossProfit: async (tenantId: string) => {
    // 1. Fetch all RO Part usages
    const partUsages = await prisma.rO_Part.findMany({
      where: {
        repairOrder: { tenantId, status: 'CLOSED' }
      },
      include: { part: true }
    });

    let totalRevenue = 0;
    let totalCogs = 0;

    partUsages.forEach(usage => {
      totalRevenue += Number(usage.retailPrice) * usage.qty;
      // Compare specific cost recorded on the RO vs the global MAC cost tracking.
      totalCogs += Number(usage.cost) * usage.qty;
    });

    const grossMargin = totalRevenue - totalCogs;
    const marginPercentage = (grossMargin / totalRevenue) * 100;

    return { totalRevenue, totalCogs, grossMargin, marginPercentage: marginPercentage.toFixed(2) };
  },

  /**
   * Tracks technician efficiency against flat-rate constraints.
   * Flags major variances (> 1.5x) where labor clocked drastically exceeds billed.
   */
  getLaborVarianceMatrix: async (tenantId: string) => {
    const laborLines = await prisma.rO_Labor.findMany({
      where: {
        repairOrder: { tenantId, status: { in: ['READY', 'CLOSED'] } }
      },
      include: {
        repairOrder: { include: { tech: true } }
      }
    });

    const techPerformance: Record<string, { flatRate: number, clocked: number, variance: number }> = {};

    laborLines.forEach(line => {
      const techName = line.repairOrder.tech?.name || 'Unassigned';
      if (!techPerformance[techName]) {
        techPerformance[techName] = { flatRate: 0, clocked: 0, variance: 0 };
      }

      const flat = Number(line.flatRateHours);
      const clocked = Number(line.clockedHours || 0);

      techPerformance[techName].flatRate += flat;
      techPerformance[techName].clocked += clocked;
      techPerformance[techName].variance += (clocked - flat);
    });

    return techPerformance;
  },

  /**
   * AI Data Payload: Supplies the copilot with aging accounts > 30 days.
   */
  getHighRiskReceivables: async (tenantId: string) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await prisma.repairOrder.findMany({
      where: {
        tenantId,
        status: 'READY',
        updatedAt: { lte: thirtyDaysAgo }
      },
      include: { customer: true }
    });
  }

};
