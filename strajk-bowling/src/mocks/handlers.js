import { rest } from 'msw';

export const handlers = [
  rest.post('/api/booking', (req, res, ctx) => {
    return res(ctx.json({ bookingNumber: '12345', totalAmount: 360 }));
  }),

];
