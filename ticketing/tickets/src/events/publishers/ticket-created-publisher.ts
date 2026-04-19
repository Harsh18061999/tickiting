import { Publisher, Subjects, TicketCreatedEvent } from '@microservicescommon/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
