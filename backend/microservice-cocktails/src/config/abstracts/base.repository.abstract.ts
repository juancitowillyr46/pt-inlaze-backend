export abstract class BaseRepository<E, M> {
    abstract toModel(data: E): M;
    abstract toEntity(data: M): E;
}