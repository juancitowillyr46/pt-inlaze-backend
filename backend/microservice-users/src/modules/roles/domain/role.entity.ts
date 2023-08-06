import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "../../users/domain/user.entity";
import { AuditableEntity } from "src/common/entitites/auditable.entity";

@Entity({name: 'roles'})
export class RoleEntity extends AuditableEntity {

    @Column('varchar', { length: 250 } )
    name: string;

    // Relación OneToOne inversa con User
    @OneToOne(() => UserEntity, (user) => user.role)
    user: UserEntity;
}