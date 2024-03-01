import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLeadCommand } from '../impl/create-lead.command';
import { Lead } from '../../../domain';
import { LeadRepository } from '../../../infrastructure-module';
import { LeadEntity } from '../../../db-adapter';

@CommandHandler(CreateLeadCommand)
export class CreateLeadCommandHandler implements ICommandHandler<CreateLeadCommand> {
  constructor(protected readonly leadRepository: LeadRepository) {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ payload }: CreateLeadCommand): Promise<Lead> {
    const lead = this.leadRepository.toDomain(
      new LeadEntity({
        email: payload.email,
        name: payload.name,
        message: payload.message,
      })
    );

    // save
    await this.leadRepository.save(lead);

    // commit
    lead.commit();

    return lead;
  }
}
