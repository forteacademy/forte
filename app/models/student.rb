class Student < ActiveRecord::Base
  include PgSearch

  multisearchable :against => [:last_name, :first_name, :email]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :city, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :availability, presence: true
  validates :gender, presence: true
  validates :birthday, presence: true
  validates :school, presence: true
  validates :school_level, presence: true
  validates :guardian_first_name, presence: true
  validates :guardian_last_name, presence: true
  validates :guardian_phone, presence: true
  validates :introduction, presence: true
  validates :lesson_experience, presence: true
  validates :performance_experience, presence: true
  validates :address, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true
  validates :location_preference, :inclusion => { :in => [true, false] }
  validates :travel_distance, presence: true
  validates :income_range, presence: true
  validates :household_number, presence: true
  validates :disciplinary_action, :inclusion => { :in => [true, false] }
  validates :criminal_charges, :inclusion => { :in => [true, false] }
  validates :waiver_signature, presence: true
  validates :waiver_date, presence: true
  validates :customer_id, presence: true, on: :new
  validates_format_of :student_email, :with => Devise::email_regexp, :allow_blank => true

  has_many :matchings, dependent: :destroy
  has_many :lessons, through: :matchings, dependent: :destroy
  has_many :teachers, through: :matchings, dependent: :destroy
  has_many :instruments, as: :instrumentable, dependent: :destroy

  accepts_nested_attributes_for :instruments

  # If any of the enums here change, make sure to change constants.es6.jsx file too
  enum school_level: [ :Kindergarten, :'1st grade', :'2nd grade', :'3rd grade',
                      :'4th grade', :'5th grade', :'6th grade', :'7th grade',
                      :'8th grade', :'9th grade', :'10th grade', :'11th grade',
                      :'12th grade' ]
  enum state: [ :AL, :AK, :AZ, :AR, :CA, :CO, :CT, :DE, :FL, :GA,
                :HI, :ID, :IL, :IN, :IA, :KS, :KY, :LA, :ME, :MD,
                :MA, :MI, :MN, :MS, :MO, :MT, :NE, :NV, :NH, :NJ,
                :NM, :NY, :NC, :ND, :OH, :OK, :OR, :PA, :RI, :SC,
                :SD, :TN, :TX, :UT, :VT, :VA, :WA, :WV, :WI, :WY ]
  enum gender: [ :Female, :Male ]
  enum travel_distance: [ :'I am not willing to travel', :'Up to 5 miles',
                          :'Up to 10 miles', :'Up to 20 miles',
                          :'20 miles or more' ]
  enum income_range: [:'$0 - $10,000', :'$10,001 - $20,000', :'$20,001 - $30,000',
                      :'$30,001 - 40,000', :'$40,001 - $50,000', :'$50,001 - $75,000',
                      :'$75,001 - $125,000', :'$125k+' ]

  def full_name
    "#{first_name} #{last_name}"
  end

  def full_address
    "#{address} #{address2} #{city}, #{state} #{zipcode}"
  end

  def submit_signup
    self.timezone = Timezone.lookup(self.lat, self.lng)
    self.save()
    if !(self.student_email.to_s.lstrip.empty?)
      ForteMailer.student_signup_notify_student(self).deliver_now
    end
    ForteMailer.student_signup_notify_admin(self).deliver_now
    ForteMailer.student_signup_notify_parent(self).deliver_now
  end
end
