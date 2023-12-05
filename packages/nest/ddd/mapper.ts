// eslint-disable-next-line
import { DomainBase } from '@packages/nest';

export interface IMapper<Domain extends DomainBase<any>, DbRecord, Response = any> {
  toPersistence(domain: Domain): DbRecord;
  toDomain(entity: any): Domain;
  toResponse(domain: Domain, opts: any): Response;
}
