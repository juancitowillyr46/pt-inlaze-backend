
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { RoleEntity } from "../../roles/domain/role.entity";
import { AuditableEntity } from "src/common/entitites/auditable.entity";

@Entity({name: 'users'})
export class UserEntity extends AuditableEntity {

    @Column('varchar', { name: 'fullname', length: 250 } )
    fullname: string;

    @Column('varchar', { name: 'email', length: 250 } )
    email: string;

    @Column('varchar', { name: 'password', length: 250 } )
    password: string;

    @Column('varchar', { name: 'phone', length: 250 } )
    phone: string;

    // Roles
    // @Column({enum: Roles, default: Roles.CUSTOMER, name: 'role'})
    // role: number;

    // Relación OneToOne con Role
    @OneToOne(() => RoleEntity, (role) => role.user, {
        onDelete: 'CASCADE',
        cascade: true
    })
    @JoinColumn({name: 'role_id'})
    role: RoleEntity;

}