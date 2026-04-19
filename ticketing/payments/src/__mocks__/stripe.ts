export const stripe = {
    charges: {
        create: jest.fn().mockImplementation((args: { amount: number; currency: string; source: string }) => {
            const charge = {
                id: 'ch_' + Math.random().toString(36).substr(2, 9),
                amount: args.amount,
                currency: args.currency,
            };
            stripe.charges.list.mockResolvedValue({ data: [charge] });
            return Promise.resolve(charge);
        }),
        list: jest.fn().mockResolvedValue({ data: [] }),
    },
};
