class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;

        this.roomsCapacity = {
            single: parseInt(this.capacity * 0.5),
            double: parseInt(this.capacity * 0.3),
            maisonette: parseInt(this.capacity * 0.2)
        };
    }

    get roomsPricing() {
        return {
            single: 50,
            double: 90,
            maisonette: 135
        };
    }

    get servicesPricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25
        };
    }

    rentARoom(clientName, roomType, nights) {
        if (this.roomsCapacity[roomType] > 0) {
            let client = {
                'client name': clientName,
                'room type': roomType,
                'nights': nights,
                'room number': this.currentBookingNumber
            };
            this.bookings.push(client);
            this.currentBookingNumber++;
            this.roomsCapacity[roomType]--;
            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber - 1}.`;
        }
        let output = `No ${roomType} rooms available! `;
        for (const room in this.roomsCapacity) {
            if (this.roomsCapacity[room] > 0) {
                output += `Available ${room} rooms: ${this.roomsCapacity[room]}. `;
            }
        }
        return output;
    }

    roomService(currentBookingNumber, serviceType) {
        let b = this.bookings.find((x) => x['room number'] === currentBookingNumber);

        if (!this.servicesPricing[serviceType]) {
            return `We do not offer ${serviceType} service.`;
        }
        if (!b.services) {
            b.services = [];
            b.services.push(serviceType);
            return `Mr./Mrs. ${b['client name']}, Your order for ${serviceType} service has been successful.`;
        }
        b.services.push(serviceType);
        return `Mr./Mrs. ${b['client name']}, Your order for ${serviceType} service has been successful.`;
    }

    checkOut(currentBookingNumber) {
        let b = this.bookings.find((x) => x['room number'] === currentBookingNumber);
        if (!b) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
        let price = b['nights'] * this.roomsPricing[b['room type']];
        if (b && b.services) {
            this.roomsCapacity[b['room type']]++;
            let serviceMoney = b.services.reduce((a, service) => a + this.servicesPricing[service], 0);
            return `We hope you enjoyed your time here, Mr./Mrs. ${b['client name']}. The total amount of money you have to pay is ${serviceMoney + price} BGN. You have used additional room services, costing ${serviceMoney} BGN."`
        } else {
            return `"We hope you enjoyed your time here, Mr./Mrs. ${b['client name']}. The total amount of money you have to pay is ${price} BGN.`;
        }
    }

    report() {
        if (this.bookings.length > 0) {
            let output = `${this.name.toUpperCase()} DATABASE:\n${'-'.repeat(20)}\n`;
            for (let b of this.bookings) {
                output += `bookingNumber – ${b['room number']}\nclientName – ${b['client name']}\nroomType – ${b['room type']}\nnights – ${b['nights']}\n`;
                if (b.services) {
                    output += `services: ${b.services.join(', ')}\n`;
                }
                output += `${'-'.repeat(10)}\n`;
            }
            output = output.substr(0, output.length - 12);
            return output;
        }
        return `${this.name.toUpperCase()} DATABASE:\n${'-'.repeat(20)}\nThere are currently no bookings.`;
    }
}
let hotel = new Hotel('HotUni', 10);

hotel.rentARoom('Peter', 'single', 4);
hotel.rentARoom('Robert', 'double', 4);
hotel.rentARoom('Geroge', 'maisonette', 6);

hotel.roomService(3, 'housekeeping');
// hotel.roomService(3, 'drink');
hotel.roomService(2, 'room');

console.log(hotel.report()); 