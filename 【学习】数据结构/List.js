class List {
    constructor (...values) {
        // rest参数
        this.dataStore = values
        this.listSize = values.length
        this.length = this.listSize
        this.pos = 0
    }
    append (ele) {
        this.dataStore.push(ele)
        this.listSize++
        this.length = this.listSize
    }
    find (ele) {
        return this.dataStore.indexOf(ele)
    }
    remove (ele) {
        let index = this.find(ele)
        if (index > -1) {
            this.dataStore.splice(index, 1)
            this.listSize--
            this.length = this.listSize
        }
    }
    toString () {
        return JSON.stringify(this.dataStore)
    }
    insert (ele, after) {
        let index = this.find(after)
        if (index > -1) {
            this.dataStore.splice(index+1, 0, ele)
            this.listSize++
            this.length = this.listSize
        }
    }
    clear () {
        for (let i = 0; i < this.dataStore.length; i++) {
            this.dataStore.pop()
            i--
        }
        this.length = this.listSize = this.pos = 0
    }
    currPos () {
        return this.pos
    }
    front (ele) {
        this.pos = 0
    }
    end (ele) {
        this.pos = this.listSize - 1
    }
    prev () {
        if( this.pos > 0 ){
            this.pos--
        }
    }
    next () {
        if( this.pos < this.listSize - 1 ){
            this.pos++
        }
    }
    moveTo (position) {
        if (position >= 0 && position <= this.listSize) {
            this.pos = position
        }
    }
    getElement () {
        return this.dataStore[this.pos]
    }
    contains (ele) {
        return this.dataStore.includes(ele)
    }
}