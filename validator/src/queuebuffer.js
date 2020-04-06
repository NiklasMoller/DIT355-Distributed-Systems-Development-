 class QueueBuffer{

    constructor(max){
        this.queueMaxLength = max;
        this.queue = [];
    }

    enqueue(data){
        if(this.queue.length < this.queueMaxLength){
            this.queue.push(data);
        } else {
            throw "Queue can take no more"
        }   
    }

    dequeue(){
        return this.queue.shift();
    }
}

module.exports = QueueBuffer;

