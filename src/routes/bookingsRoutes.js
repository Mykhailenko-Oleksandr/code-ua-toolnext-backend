import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  checkAvailability,
  createBooking,
  getAllBookings,
} from '../controllers/bookingsController.js';
import { createBookingSchema } from '../validations/bookingValidations.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/tools/:toolId/availability', checkAvailability);

router.post(
  '/bookings/create',
  authenticate,
  celebrate(createBookingSchema),
  createBooking,
);

router.get('/bookings', getAllBookings);

export default router;
