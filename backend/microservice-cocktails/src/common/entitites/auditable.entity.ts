import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class AuditableEntity extends BaseEntity  {

  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column('boolean', {name: 'is_deleted', default: false})
  isDeleted: boolean;

}