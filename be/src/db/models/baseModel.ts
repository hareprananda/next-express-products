import { redis } from '../redis';

type Model = {
  id: string;
  [key: string]: any;
};

type PaginationRes<T> = {
  data: T[];
  metadata: {
    page: number;
    limit: number;
    count: number;
  };
};

class BaseModel<T extends Model> {
  protected key = '';

  async add(data: T): Promise<boolean> {
    const id = data['id'];
    const result = await redis.hset(this.key, id, JSON.stringify(data));
    return result > 0;
  }

  async getAll(): Promise<T[]> {
    const datas = await redis.hgetall(this.key);
    return Object.entries(datas).map(([id, data]) => ({
      id,
      ...JSON.parse(data)
    }));
  }

  async get(id: string): Promise<T> {
    const data = await redis.hget(this.key, id);
    return data ? JSON.parse(data) : null;
  }

  async update(id: string, updatedData: Partial<T>): Promise<boolean> {
    const data = await this.get(id);
    if (data) {
      const newData = { ...data, ...updatedData };
      await redis.hset(this.key, id, JSON.stringify(newData));
      return true;
    } else {
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await redis.hdel(this.key, id);
    return result > 0;
  }

  async pagination(page: number, limit: number): Promise<PaginationRes<T> | null> {
    try {
      const allDataEntries = Object.entries(await redis.hgetall(this.key));
      const datas = allDataEntries.slice((page - 1) * limit, page * limit);
      const result = datas.map(([id, data]) => ({
        id,
        ...JSON.parse(data)
      }));

      return {
        data: result,
        metadata: {
          count: allDataEntries.length,
          limit,
          page
        }
      };
    } catch {
      return null;
    }
  }
}

export default BaseModel;
