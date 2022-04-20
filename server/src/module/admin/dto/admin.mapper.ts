import { Admin } from '../entities/admin.entity'

export const toAdmin = (admin: Admin) => ({
    id: admin.id,
    email: admin.email,
})
