/**
 * @class Package
 */

class Package{
    /**
     * @param {Package[]} pack
     */
    constructor(pack){
       Object.entries(pack).forEach(([k,v]) => this[k] = v)
    }

    get root(){
        return this.path
    }

    
}

export default Package