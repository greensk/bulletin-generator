export type Address = {
  city: string
  street: string
  house: string
}
export type MeetingType = 'public' | 'distant' | 'combined'

export type PublicMeeting = {
  place: string
  date: string
  time: string
}

export type Person = {
  fullName: string
  ownFlat: string
}

export type Organization = {
  organizationName: string
}

export type DistantMeeting = {
  endDate: string
  endTime: string
  reception: string
}

export type Question = {
  text: string
  id: string
}

export type Meeting = {
  address: Address
  initiators: Organization | Array<Person>
  questions: Array<Question>
  meetingType: MeetingType
  public: PublicMeeting
  distant: DistantMeeting
}
