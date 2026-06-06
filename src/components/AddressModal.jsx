import { useState } from 'react';

const WHATSAPP_NUMBER = '917019214982';

const Field = ({ label, error, children }) => (
    <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
        {children}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const inputCls = (err) =>
    `mt-1 w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 ${err ? 'border-red-400' : 'border-gray-200'}`;

const AddressModal = ({ onClose, orderItems, onSuccess }) => {
    const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
    const [errors, setErrors] = useState({});

    const set = (field, val) => {
        setForm(f => ({ ...f, [field]: val }));
        setErrors(e => ({ ...e, [field]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Required';
        if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter valid 10-digit number';
        if (!form.address.trim()) e.address = 'Required';
        if (!form.city.trim()) e.city = 'Required';
        if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = 'Enter valid 6-digit pincode';
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }

        const lines = orderItems.map(item =>
            `• ${item.name} (${item.quantity}) × ${item.qty} = ₹${item.final_price * item.qty}`
        ).join('\n');
        const total = orderItems.reduce((s, i) => s + i.final_price * i.qty, 0);

        const msg = [
            '🍯 *New Honey Order!*',
            '',
            '*Customer Details:*',
            `Name: ${form.name}`,
            `Phone: ${form.phone}`,
            `Address: ${form.address}, ${form.city} - ${form.pincode}`,
            '',
            '*Order Items:*',
            lines,
            '',
            `*Total: ₹${total}*`,
        ].join('\n');

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        onSuccess?.();
        onClose();
    };

    const total = orderItems.reduce((s, i) => s + i.final_price * i.qty, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold text-amber-900">Delivery Address</h2>
                        <p className="text-xs text-gray-400 mt-0.5">We'll send your order details on WhatsApp</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    <Field label="Full Name" error={errors.name}>
                        <input
                            className={inputCls(errors.name)}
                            placeholder="Your full name"
                            value={form.name}
                            onChange={e => set('name', e.target.value)}
                        />
                    </Field>

                    <Field label="Phone Number" error={errors.phone}>
                        <input
                            className={inputCls(errors.phone)}
                            placeholder="10-digit mobile number"
                            value={form.phone}
                            onChange={e => set('phone', e.target.value)}
                            maxLength={10}
                            inputMode="numeric"
                        />
                    </Field>

                    <Field label="Full Address" error={errors.address}>
                        <textarea
                            className={`${inputCls(errors.address)} resize-none`}
                            placeholder="House no, street, area, landmark..."
                            rows={2}
                            value={form.address}
                            onChange={e => set('address', e.target.value)}
                        />
                    </Field>

                    <div className="flex gap-3">
                        <Field label="City" error={errors.city}>
                            <input
                                className={inputCls(errors.city)}
                                placeholder="City"
                                value={form.city}
                                onChange={e => set('city', e.target.value)}
                            />
                        </Field>
                        <Field label="Pincode" error={errors.pincode}>
                            <input
                                className={inputCls(errors.pincode)}
                                placeholder="6-digit pincode"
                                value={form.pincode}
                                onChange={e => set('pincode', e.target.value)}
                                maxLength={6}
                                inputMode="numeric"
                            />
                        </Field>
                    </div>
                </div>

                {/* Order summary */}
                <div className="mt-5 bg-amber-50 rounded-2xl p-4 text-sm border border-amber-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Order Summary</p>
                    {orderItems.map(item => (
                        <div key={item.key} className="flex justify-between text-gray-600 py-1">
                            <span className="truncate mr-2">{item.name} <span className="text-gray-400">({item.quantity})</span> × {item.qty}</span>
                            <span className="font-semibold text-amber-700 flex-shrink-0">₹{item.final_price * item.qty}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-gray-800 border-t border-amber-200 mt-2 pt-2">
                        <span>Total</span>
                        <span className="text-amber-600 text-base">₹{total}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-2xl hover:bg-gray-50 transition text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-3 rounded-2xl shadow-md shadow-green-200 transition-all text-sm flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
