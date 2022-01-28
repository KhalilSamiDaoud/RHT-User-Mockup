class FacilityTrip {
    constructor(tripObj, isArival) {
        this.isArival = isArival;
        this.driverNumber = (tripObj['Driver Number']) ? tripObj['Driver Number'] : 'N/A';
        this.vehicleNumber = (tripObj['Vehicle Number']) ? tripObj['Vehicle Number'] : 'N/A';
        this.confirmation = tripObj['Trip Number'];
        this.status = tripObj['Trip Status'];
        this.name = tripObj['Patients Name'];
        this.rowID = tripObj['Rowid'];
        this.eta = tripObj['ETA'];

        this.scheduledDateTime = new Date('01/01/1970 ' + tripObj['schedule Time']);
        this.scheduledPUTime = this.scheduledDateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        let tempData = this.#getStatusTypeData();
        this.statusMsg = tempData.msg;
        this.statusIcon = tempData.icon;

        //placeholder data
        this.phoneNumber = '999-999-9999';
        this.#generateRandData(tripObj);
    }

    #getStatusTypeData() {
        switch (this.status) {
            case ("IRTPU"):
                return { msg: 'RIDER AWAITING VEHICLE, DRIVER EN ROUTE', icon: '' };
            case ("ACCEPTED"):
                return { msg: 'RIDER AWAITING VEHICLE', icon: '' };
            case ("ATLOCATION"):
                return { msg: 'RIDER IS ABOUT TO ONBOARD', icon: '' };
            case ("PICKEDUP"):
                return { msg: 'RIDER HAS BEEN PICKED UP (ONBOARDED)', icon: '' };
            case ("NOSHOW"):
                return { msg: 'RIDER MARKED AS NO-SHOW BY DRIVER', icon: 'cancel' };
            case ("DROPPED"):
                if (this.isArival)
                    return { msg: 'RIDER HAS BEEN DROPPED OFF AT FACILITY', icon: 'check_circle' };
                else
                    return { msg: 'RIDER  HAS BEEN DROPPED OFF AT DESTINATION', icon: 'check_circle' };
            case ("CANCELLED"):
                return { msg: 'RIDE HAS BEEN CANCELLED', icon: 'cancel' };
            default:
                return { msg: 'NO RIDE HAS BEEN SCHEDULED', icon: '' };
        }
    }

    #generateRandData(tripObj) {
        this.vehicleNumber = Math.ceil(Math.random() * 1000);
        this.driverNumber = Math.ceil(Math.random() * 10000);

        this.reqPUTime = new Date('01/01/1970 ' + tripObj['schedule Time']);
        this.forcastedPUTime = new Date('01/01/1970 ' + tripObj['schedule Time']);
        this.reqDOTime = new Date('01/01/1970 ' + tripObj['schedule Time']);
        this.scheduledDOTime = new Date('01/01/1970 ' + tripObj['schedule Time']);
        this.forcastedDOTime = new Date('01/01/1970 ' + tripObj['schedule Time']);

        this.reqPUTime.setMinutes(this.scheduledDateTime.getMinutes() - 5);
        this.reqPUTime = this.reqPUTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        this.forcastedPUTime.setMinutes(this.scheduledDateTime.getMinutes() + 3);
        this.forcastedPUTime = this.forcastedPUTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        this.reqDOTime.setMinutes(this.scheduledDateTime.getMinutes() + 90);
        this.reqDOTime = this.reqDOTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        this.scheduledDOTime.setMinutes(this.scheduledDateTime.getMinutes() + 95);
        this.scheduledDOTime = this.scheduledDOTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        this.forcastedDOTime.setMinutes(this.scheduledDateTime.getMinutes() + 98);
        this.forcastedDOTime = this.forcastedDOTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        this.status = this.#getRandStatus();

        let tempData = this.#getStatusTypeData();
        this.statusMsg = tempData.msg;
        this.statusIcon = tempData.icon;

        this.tripProg = Math.ceil(Math.random() * 100);

        if (this.status === "CANCELLED" || this.status === "NOSHOW") {
            this.tripProg = 0;
            this.progStyleClass = 'no-prog';
            this.tripStyleClass = 'cancelled-trip';
        }
        else if (this.status === "DROPPED") {
            this.tripProg = 100;
            this.tripStyleClass = 'finished-trip';
        }
        else if (this.status === "PICKEDUP"){
            this.tripProg = Math.ceil(Math.random() * 100);
        }
        else {
            this.tripProg = 0;
        }
    }

    #getRandStatus() {
        switch (Math.ceil(Math.random() * (7 - 1 + 1) + 1)) {
            case (1):
                return "IRTPU";
            case (2):
                return "ACCEPTED";
            case (3):
                return "ATLOCATION";
            case (4):
                return "PICKEDUP";
            case (5):
                return "NOSHOW";
            case (6):
                return "DROPPED";
            case (7):
                return "CANCELLED"
            default:
                return "NONE";
        }
    } 
}

export { FacilityTrip };