class CircuitBreaker {

    constructor(timeout){
        this.isOpen = false;
        this.errorTimeStamp;
        this.currentTimeStamp;
        this.timeout = timeout; 
    }

    executeAction(drawOnMap,data){
        if(this.isOpen){
            this.currentTimeStamp = Math.floor(Date.now() / 1000)
            if(this.currentTimeStamp-this.errorTimeStamp < this.timeout){
                console.log('Status: Ciruitbreaker Open')
            } else {
                this.isOpen = false;
                console.log('Status: Circuitbreaker Closed')
            }
        } else {
            try {
                drawOnMap(data)
            } catch (error) {
                this.isOpen = true;
                console.log('Status: Circuitbreaker Open')
                console.log(error)
                this.errorTimeStamp = Math.floor(Date.now() / 1000)
            }
        }
    }
}

