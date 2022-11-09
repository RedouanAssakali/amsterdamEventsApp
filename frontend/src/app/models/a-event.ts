export class AEvent {

  id: number| undefined ;
  title: string | undefined;
  start: Date | undefined;
  end: Date | undefined;
  description: string | undefined;

  status: AEventStatus | undefined;
  isTicketed: Boolean | undefined;
  participationFee: number | undefined;
  maxParticipants: number | undefined;


  constructor(id?:number, title?: string | undefined, start?: Date | undefined, end?: Date | undefined, description?: string | undefined, status?: AEventStatus | undefined,
              IsTicketed?: Boolean | undefined, participationFee?: number | undefined, maxParticipants?: number | undefined) {
    this.id  = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.status = status;
    this.isTicketed = IsTicketed;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
  }

  public static createSampleAEvent(pId = 0): AEvent{
    let dateToday = new Date();
    let maxStartDate = new Date();
    let maxEndDate = new Date();

    let randomTitle: string = "The Event-" + pId;
    let randomDescription: string = "Description of event-" + pId;

    //start date
    maxStartDate.setDate(dateToday.getDay() + 10);
    let randomStartDate : Date = this.createRandomDate(dateToday, maxStartDate);

    //end date
    maxEndDate.setDate(randomStartDate.getDay() + 10);
    let randomEndDate : Date = this.createRandomDate(randomStartDate, maxEndDate);

    let randomStatus = this.getRandomStatus();
    let randomParticipationFee = Math.round(Math.random() * 4900 + Number.EPSILON ) / 100;
    let randomParticipants = Math.round(Math.random() * 1000);
    let randomIsTicketed : boolean = randomParticipationFee != 0;

    return new AEvent(pId,randomTitle, randomStartDate, randomEndDate, randomDescription, randomStatus, randomIsTicketed, randomParticipationFee, randomParticipants);
  }

  public static createRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  public static getRandomStatus(): AEventStatus {
    let statusNumber = Math.round(Math.random() * 3);
    if (statusNumber == 0) {
      return AEventStatus.DRAFT;
    } else if (statusNumber == 1) {
      return AEventStatus.PUBLISHED;
    } else return AEventStatus.CANCELED;
  }

  public static getAEventStatusDraft():AEventStatus {
    return AEventStatus.DRAFT;
  }

  static copyConstructor(aEvent:AEvent):AEvent{
    return Object.assign(new AEvent(), aEvent)
  }

}

  enum AEventStatus{
    DRAFT = "DRAFT",
    PUBLISHED =  "PUBLISHED",
    CANCELED = "CANCELED"
  }
