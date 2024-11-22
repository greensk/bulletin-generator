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
  startDatetime: string
  endDatetime: string
  reception: string
}

export type Meeting = {
  address: Address
  initiators: Organization | Array<Person>
  questions: Record<string, string>
} & (
  {
    meetingType: 'public'
    public: PublicMeeting
  }
  |
  {
    meetingType: 'distant'
    distant: DistantMeeting
  }
  |
  {
    meetingType: 'combined'
    public: PublicMeeting
    distant: DistantMeeting
  }
)