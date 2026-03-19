import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Tracing genesis operational paths...');

  // 1. Core Platform Master Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'David Wade Marine Operations',
      locations: {
        create: [
          { name: 'Showroom HQ', isServiceCenter: true },
          { name: 'Storage Yard', isServiceCenter: false },
        ]
      }
    },
    include: { locations: true }
  });
  
  const mainLocationId = tenant.locations[0].id;
  console.log(`✅ Tenant Provisioned: ${tenant.name}`);

  // 2. Base Employee Structure
  const manager = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      locationId: mainLocationId,
      email: 'ned.admin@marine.local',
      name: 'Ned Admin',
      role: 'GENERAL_MANAGER',
      hourlyRate: 85.00
    }
  });

  const tech = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      locationId: mainLocationId,
      email: 'tech.mike@marine.local',
      name: 'Mike Technician',
      role: 'TECHNICIAN',
      hourlyRate: 35.00
    }
  });
  console.log(`✅ Employees Provisioned: [${manager.name}, ${tech.name}]`);

  // 3. CRM Base & Assets
  const customer = await prisma.customer.create({
    data: {
      tenantId: tenant.id,
      name: 'Robert Fleet Services',
      type: 'COMMERCIAL',
      loyaltyTier: 'VIP_PLATINUM',
      assets: {
        create: [
          { make: 'Boston Whaler', model: '320 Vantage', year: 2023, primaryHIN: 'BWCE12345K223' },
          { make: 'SeaRay', model: 'SPX 210 Outboard', year: 2021, primaryHIN: 'SRAY89012J121' }
        ]
      }
    },
    include: { assets: true }
  });
  console.log(`✅ Commercial Account Provisioned: ${customer.name}`);

  // 4. Logistics & Parts Inventory
  const part1 = await prisma.partItem.create({
    data: {
      tenantId: tenant.id,
      locationId: mainLocationId,
      sku: 'YAM-69J-13440-03',
      name: 'Yamaha Oil Filter F150',
      category: 'Maintenance',
      vendor: 'Yamaha Outboards',
      qtyOnHand: 14,
      minBound: 20,
      maxBound: 50,
      macCost: 18.50,
      price: 29.99
    }
  });

  const part2 = await prisma.partItem.create({
    data: {
      tenantId: tenant.id,
      locationId: mainLocationId,
      sku: 'MERC-8M0100526',
      name: 'Mercury Water Pump Kit',
      category: 'Maintenance',
      vendor: 'Mercury Marine',
      qtyOnHand: 2,
      minBound: 5,
      maxBound: 15,
      macCost: 45.00,
      price: 68.00
    }
  });
  console.log(`✅ Parts Master Initialized: [${part1.sku}, ${part2.sku}]`);

  // 5. Active Service Lane (ROs)
  const ro = await prisma.repairOrder.create({
    data: {
      tenantId: tenant.id,
      locationId: mainLocationId,
      customerId: customer.id,
      assetId: customer.assets[0].id,
      techId: tech.id,
      status: 'DIAGNOSING',
      complaint: 'Customer states engine bogs down at 4000 RPM under heavy load.',
      hasComebackRisk: true,
      laborLines: {
        create: [
          { description: 'Initial Diagnostics Block', flatRateHours: 1.5, ratePerHour: 145.00 }
        ]
      }
    }
  });
  console.log(`✅ Active Repair Order Initialized: ${ro.id}`);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🚀 DB Genesis Command Complete.');
  });
