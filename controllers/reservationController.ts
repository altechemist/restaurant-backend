import { Request, Response } from 'express';
import { Reservation } from '../models/reservationModel';

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: 'Error creating reservation' });
  }
};

export const getReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await Reservation.find().populate('restaurant').populate('user');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};
