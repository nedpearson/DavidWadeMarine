import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Search, UserMinus, Plus, Minus, Trash2, CreditCard, Banknote, Ban } from 'lucide-react';

interface CartItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  qty: number;
  discount: number;
}

export const Checkout = () => {
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', sku: 'YAM-69J-13440-03-00', name: 'Yamaha Oil Filter F150', price: 29.99, qty: 2, discount: 0 },
    { id: '2', sku: 'SHOP-RAGS-BNDL', name: 'Shop Towel Bundle', price: 14.50, qty: 1, discount: 0 }
  ]);
  const [scanBuffer, setScanBuffer] = useState('');
  const [splitTender, setSplitTender] = useState(false);
  const [tenderCaptured, setTenderCaptured] = useState<string>('');
  
  const scanInputRef = useRef<HTMLInputElement>(null);

  // Keep scanner input focused by default for speed
  useEffect(() => {
    scanInputRef.current?.focus();
  }, []);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanBuffer.trim()) return;
    
    // Simulate finding item
    const newItem: CartItem = {
      id: Date.now().toString(),
      sku: scanBuffer,
      name: `Scanned Item: ${scanBuffer}`,
      price: 19.99,
      qty: 1,
      discount: 0
    };
    
    setCart([newItem, ...cart]); // Prepend for immediate feedback top of list
    setScanBuffer('');
    scanInputRef.current?.focus();
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.qty + delta);
        return { ...i, qty: newQty };
      }
      return i;
    }));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.0825; // Example Marine Tax Rate
  const total = subtotal + tax;
  
  const capturedAmount = parseFloat(tenderCaptured) || 0;
  const remainingBalance = Math.max(0, total - capturedAmount);

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      {/* Left Pane: Cart Operations */}
      <div className="glass-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        
        {/* Scanner Bar (Priority Input) */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <form onSubmit={handleScanSubmit} style={{ flex: 1, display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'var(--color-bg-deep)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)' }}>
            <Search size={20} color="var(--color-primary)" />
            <input 
              ref={scanInputRef}
              autoFocus
              value={scanBuffer}
              onChange={e => setScanBuffer(e.target.value)}
              placeholder="Scan Barcode or Search SKU..." 
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.25rem', outline: 'none' }}
            />
          </form>
          <button style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', borderRadius: 'var(--radius-md)', fontWeight: 500 }}>Find Customer</button>
        </div>

        {/* Line Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
          {cart.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <ShoppingCart size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>Cart is empty. Scan item to begin.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 150px 100px 50px', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent', transition: 'background 0.2s ease' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>{item.name}</p>
                  <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>SKU: {item.sku}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'var(--color-text-main)' }}><Minus size={16} /></button>
                  <input type="text" readOnly value={item.qty} style={{ width: '40px', textAlign: 'center', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', color: '#fff', padding: '4px 0' }} />
                  <button onClick={() => updateQty(item.id, 1)} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'var(--color-text-main)' }}><Plus size={16} /></button>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 600, fontSize: '1.1rem' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', opacity: 0.7 }}><Trash2 size={20} /></button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Right Pane: Tenders & Control */}
      <div className="glass-panel" style={{ width: '400px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        
        {/* Customer Context Context */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>Attached Entity</h3>
            <p style={{ fontWeight: 600, fontSize: '1.25rem', margin: '0.25rem 0' }}>John Doe (Guest)</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>Walk-in Status</span>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)' }}><UserMinus size={20} /></button>
        </div>

        {/* Totals Section */}
        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            <span>Tax (8.25%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            <span>Discounts</span>
            <span style={{ color: 'var(--color-success)' }}>-$0.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '2px dashed var(--color-border)' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total Due</span>
            <span style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-accent)', lineHeight: 1 }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Pad */}
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.25rem', background: 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>
              <Banknote size={28} />
              Exact Cash
            </button>
            <button style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>
              <CreditCard size={28} />
              Card Terminal
            </button>
          </div>

          <button 
            onClick={() => setSplitTender(!splitTender)}
            style={{ padding: '1rem', background: 'transparent', border: '1px dashed var(--color-text-muted)', color: 'var(--color-text-muted)', borderRadius: 'var(--radius-md)', fontWeight: 500 }}
          >
            {splitTender ? 'Cancel Split Tender' : 'Enable Split Tender'}
          </button>

          {splitTender && (
            <div className="animate-fade-in" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Primary Amount Captured</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-danger)' }}>Remains: ${remainingBalance.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  value={tenderCaptured}
                  onChange={(e) => setTenderCaptured(e.target.value)}
                  placeholder="Amount..." 
                  style={{ flex: 1, padding: '0.5rem', background: 'var(--color-bg-deep)', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '4px' }} 
                />
                <button 
                  style={{ padding: '0.5rem 1rem', background: remainingBalance === 0 ? 'var(--color-success)' : 'var(--color-accent)', border: 'none', color: (remainingBalance === 0 || capturedAmount > 0) ? '#fff' : 'rgba(255,255,255,0.5)', borderRadius: '4px', fontWeight: 600 }}
                  disabled={capturedAmount === 0}
                >
                  {remainingBalance === 0 ? 'Complete Sale' : 'Capture'}
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
            <button style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Ban size={16} /> Suspend Cart
            </button>
            <button style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Trash2 size={16} /> Void
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
