import Redis from 'ioredis';

let cacheClient = null;

/**
 * Connect to Redis Server
 * 
 * @param null
 * @returns {Object} Redis Object
 */
export const connection = async() => {
  const connectParams = process.env.REDIS_ENDPOINT.split(':');
  console.log('Connecting to redis', connectParams);
  
  try {
    cacheClient = new Redis({
    host: connectParams[0],
    port: connectParams[1],
    connectTimeout: 5000,
    reconnectOnError: function (err) {
        console.log('Reconnect on error', err);
        var targetError = 'READONLY';
        if (err.message.slice(0, targetError.length) === targetError) {
          // Only reconnect when the error starts with "READONLY"
          return true;
        }
    },
    retryStrategy: function (times) {
        console.log('Redis Retry', times);
        if (times >= 3) {
          return undefined;
        }
        var delay = Math.min(times * 50, 2000);
        return delay;
      }
    });
    console.log('Create Redis Client success');
  } catch (error) {
    console.error('Connect to redis failed', error);
  }
};


/**
 * Adds one or more members to a set. Create the key if it doesn't exist.
 * 
 * @param Key
 * @param values
 * @returns {int} the number of elements that were added to the set, not including all the elements already present in the set.
 * 
 * redis> SADD myset "Hello"
 * (integer) 1
 * redis> SADD myset "World"
 * (integer) 1
 * redis> SADD myset "World"
 * (integer) 0
 * redis> SMEMBERS myset
 * 1) "World"
 * 2) "Hello"
 * redis> 
 */
export const sadd = async(key,value) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.sadd(key,value);
      if(result){
        result = JSON.parse(result);
      }
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};


/**
 * Returns the set cardinality (number of elements) of the set stored at key.
 * 
 * @param Key
 * @returns {int} Integer reply: the cardinality (number of elements) of the set, or 0 if key does not exist.
 * 
 * redis> SADD myset "Hello"
 * (integer) 1
 * redis> SADD myset "World"
 * (integer) 1
 * redis> SCARD myset
 * (integer) 2
 * redis> 
 */
export const scard = async( key ) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.scard(key);
      if(result){
        result = JSON.parse(result);
      }
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};



/**
 * Determines whether a member belongs to a set.
 * 
 * @param Key
 * @param value
 * @returns Integer reply, specifically: 1 if the element is a member of the set. 0 if the element is not a member of the set, or if key does not exist.{int} Returns if member is a member of the set stored at key.
 * 
 * redis> SADD myset "one"
 * (integer) 1
 * redis> SISMEMBER myset "one"
 * (integer) 1
 * redis> SISMEMBER myset "two"
 * (integer) 0
 * redis> 
 */
export const sismember = async( key , value ) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.sismember(key,value);
      if(result){
        result = JSON.parse(result);
      }
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};


/**
 * Returns all members of a set.

 * @param key
 * @returns Array reply: all elements of the set.
 * 
 * redis> SMEMBERS myset
 * 1) "World"
 * 2) "Hello"
 * redis>
 */
export const smembers = async( key ) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.smembers(key);
      if(result){
      //  result = JSON.parse(result);
      }
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};


/**
 * Returns one or more random members from a set after removing them. Deletes the set if the last member was popped.
 * 
 * @param key
 * @returns When called without the count argument:
 * Bulk string reply: the removed member, or nil when key does not exist.
 * When called with the count argument:
 * Array reply: the removed members, or an empty array when key does not exist.
 * 
 * redis> SPOP myset
 * "two"
 * redis> SPOP myset 3
 * 1) "three"
 * 2) "four"
 * 3) "five"
 */
export const spop = async( key ) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.spop(key);
      if(result){
        result = JSON.parse(result);
      }
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};


/**
 * Removes one or more members from a set. Deletes the set if the last member was removed.
 * 
 * @param key
 * @param value
 * @returns Integer reply: the number of members that were removed from the set, not including non existing members.
 * 
 * redis> SREM myset "one"
 * (integer) 1
 * redis> SREM myset "four"
 * (integer) 0
 */
export const srem = async( key , value ) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.srem(key,value);
      if(result){
        result = JSON.parse(result);
      }
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};



/**
 * Iterates over members of a set.
 * 
 * @param key
 * @param value
 * @returns return back to 0. N is the number of elements inside the collection.
 */
export const sscan = async( key , value ) => {
  try{
    if( cacheClient ){
      let result = await cacheClient.sscan(key,value);
      console.log(`Read cache key=${key}`,result);
      return result;
    } else {
      console.log('Cache is not available');
    } 
  } catch ( err ){
    console.error('Read cache error',err);
  }
};





export const handler = async(event) => {
    await connection();
  
    const CACHE_KEY = 'BlastId-999';

    const numbers = [1, 3, 5, 7, 9 , 4, 5, 1,32, 32, 434, 243];

     await sadd(CACHE_KEY, numbers);
     await sadd(CACHE_KEY, "82735986235");
     await scard(CACHE_KEY);
     await sismember(CACHE_KEY,'82735986235');
     await smembers(CACHE_KEY);
    
    await sscan(CACHE_KEY,"243");
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
