import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  checkAvailability,
  createBooking,
} from '../controllers/bookingsController.js';
import { createBookingSchema } from '../validations/bookingValidations.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/tools/:toolId/availability', checkAvailability);

router.post(
  '/bookings/:toolId',
  authenticate,
  celebrate(createBookingSchema),
  createBooking,
);

export default router;