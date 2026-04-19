import { Subjects, Publisher, ExpirationCompleteEvent } from '@microservicescommon/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}
