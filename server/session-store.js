function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 获取redis中存储的session数据
  async get(sid) {
    console.log('get session', sid);
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);
    if(!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch(err) {
      console.log(err);
    }
  }

  // 存储session数据到redis
  async set(sid, sess, ttl) {
    console.log('set session', sid);
    const id = getRedisSessionId(sid);
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if(ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch(err) {
      console.log(err);
    }
  }

  // 从redis当中删除某个session
  async destroy(sid) {
    console.log('destory session', sid);
    const id = getRedisSessionId(sid);
    try {
			await this.client.del(id)
		} catch (err) {
			console.log('TCL: RedisSessionStore -> del -> err', err)
		}
  }
}

module.exports = RedisSessionStore