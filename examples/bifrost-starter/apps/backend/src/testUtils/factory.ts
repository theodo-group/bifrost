import { ObjectLiteral, Repository } from 'typeorm';

export abstract class Factory<T extends ObjectLiteral> {
  private readonly repository?: Repository<T>;
  constructor(repository?: Repository<T>) {
    this.repository = repository;
  }

  protected abstract createBase(entity?: Partial<T>): T;

  createMany = (entities: Array<Partial<T>>): Promise<T[]> | T[] => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const createdEntities = entities.map(this.createBase);

    if (this.repository === undefined) {
      return createdEntities;
    }

    return this.repository.save(createdEntities);
  };

  createOne = (entity?: Partial<T>): Promise<T> | T => {
    const createdEntity = this.createBase(entity);

    if (this.repository === undefined) {
      return createdEntity;
    }

    return this.repository.save(createdEntity);
  };
}
