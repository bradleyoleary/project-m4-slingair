"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

// Get ALL flights (flight numbers)
const getFlights = (req, res) => {
    res.status(200).json({ status: 200, data: Object.keys(flights) })
};

// Get single flight data (seating)
const getFlight = (req, res) => {
  const { flightNumber } = req.params;
  //obtaining all flight nums
  const allflights = Object.keys(flights);
  //console.log(allflights)
  //confirm if flight num is in arr
  if (allflights.includes(flightNumber)) {
    let flightArray = flights[flightNumber]
    res.status(200).json({ status: 200, data: flightArray })
  } else {
    res.status(400).json({ status: 400, error: 'Flight not found.' })
  }
}

// Get all reservations
const getReservations = (req, res) => {
  res.status(200).json({ status: 200, data: reservations })
};

// Get single reservation (by ID) 
const getSingleReservation = (req, res) => {
  const { id } = req.params;
  const reservation = reservations.filter((reserv) => {
    return reserv.id === id;
  });
  if (reservation.length === 0) {
    res.status(400).json({ status: 400, data: id, error: 'Reservation not found.' })
  } else {
    res.status(200).json({ status: 200, reservation: reservation });
  }
};

// Create a reservation
const addReservations = (req, res) => {
  const data = req.body;
  const id = uuidv4();
  //console.log(id)
  data.id = id;
  reservations.push(data);
  res
    .status(201)
    .json({ status: 201, message: "The reservation has been added.", data: data });
};

// Delete a reservation - FE stretch if possible
const deleteReservation = (req, res) => {
  const { id } = req.params;
  let reservationExists = false;
  let index = 0
  reservations.forEach((reservation, i) => {
    if (reservation.id === id) {
      reservationExists = true;
      index = i;
    }
  })
  if (reservationExists) {
    reservations.splice(index, 1);
    //console.log(reservations)
    res.status(202).json({ status: 202, message: `This reservation, ID: ${id}, has been deleted.` })
  } else {
    res.status(400).json({ status: 400, data: id, error: 'Reservation not found. Cannot delete.' })
  }
};

// Update a reservation - FE stretch if possible
const updateReservation = (req, res) => {
  const { id } = req.params;
  //console.log({id})
  const updateReso = req.body;
  //console.log(updateReso)
  //update seat and seat only (for now, rest is done on front end?)
  const { newSeat } = updateReso
  //find reservation using 'find'
  const reserv = reservations.find((reso) => reso.id === id)
  //console.log(reserv)
  //locate index 
  const index = reservations.indexOf(reserv)
  //console.log(index)
  reservations[index].seat = `${newSeat}`; 

  //if statement for reservations
  if (reserv) {
    res.status(200).json({ status: 200, message: `This reservation has been updated.`, data: reserv })
  } else {
    res.status(400).json({ status: 400, data: id, error: 'Cannot update reservation.' })
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
