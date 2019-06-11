
# More ActiveRecord 


## associations / relationships

  http://guides.rubyonrails.org/association_basics.html


  ### one-to-many

    has_many :foos
    belongs_to :foo

    ```
    Student
      belongs_to :school

    School
      has_many :students
    ```

    here, ActiveRecord assumes the "students" table will have a column called "school_id"


  ### many-to-many

  User
    has_and_belongs_to_many :songs

  Song
    has_and_belongs_to_many :users


   here, ActiveRecord assumes there is a "users_songs" table with columns: "user_id" "songs_id"



   ### through 

    User -* Rating *- Song

    could use HABTM with a songs_users table
      but, not if we wanted to store the value of the rating (ex. 5)
      for that, we create a seperate Rating model
      if we want to access "all songs rated by a user", can use :through

    User
      has_many :ratings
      has_many :songs, through: :ratings

    Rating  
      belongs_to :user
      belongs_to :song

    Song
      has_many :ratings
      has_many :users, through: :ratings

    @user.ratings  # returns ratings
    @user.songs    # returns songs
    @songs.users   # returns users

  ### dependent destroy

  if you need to destroy related objects when the parent is destroyed, you can do:
    `has_many :students, dependent: :destroy`




## validations

  http://guides.rubyonrails.org/active_record_validations.html

  run just before an object is saved to the database, ie:
    create create!  save save!  update update!
    ! ignores the validations

  activeRecord adds:
    - @object.valid? method
    - @object.errors method


  class User
    validates :name,
      presence: true,
      length: { minimum: 1,
                maximum: 10,
                in: 1..10 },
      numericality: { only_integer: true,
                      greater_than: 5,
                      less_than_or_equal_to: 8 },
      format: { with: /iamregex/, message: 'not valid format' },
      uniqueness: true
  end



## custom validations

  ```
  class Student < ActiveRecord::Base
   
    validate :age_is_even

    private

    def age_is_even
      if age and age % 2 != 0
        errors.add(:age, 'age must be even') 
      end
    end
  end
  ```

  # will run validation only if object.bar is truthy:
  validates :foo, presence: true, if: :some_attr

  # will run validation only if object.custom_method? is truthy
  validates :foo, presence: true, if: :custom_method?

  - you should check if a variable exists before calling methods on it
  - the first argument to errors.add must match what what the test expects
  - `:attr_is_even` should be a private method
  - name of custom validation should be what you're making sure is true
      yes:  `validate :correct_state`
      no:   `validate :incorrect_state`
      okayish: `validate :not_incorrect_state`



## sql queries
  INSECURE: `Foo.where("table.column IS NULL AND table.other_column = "+variable)`

  GOOD: `Foo.where("table.column IS NULL AND table.other_column = ?", variable)`


## callbacks / hook / actions

  http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html

  can tell ActiveRecord to run some methods we create every time it creates, saves or validates an object

  `before_save :do_something`
  `after_save :do_something`

   before_create
   after_create
   before_validation
   after_validation

  class User < ActiveRecord::Base

     before_validation :convert_phone

     private

     def convert_phone
       phone = phone.gsub(" ","-")
     end

   end


  - callbacks should be private 
  - if a `before_save` callback returns `false`, it will prevent the save
  - you can check for a 'dirty' attribute (attr that has changed but not saved):
      ex. for .name -> .name_changed?

    s = Student.first
    s.name_changed?  # false
    s.name = "asdfasdf"
    s.name_changed?  # true
    s.save
    s.name_changed? # false


  you can have a custom callback call methods on related objects

  ```
  def graduate
    self.school.reduce_student_count
  end
  ```

  (`self` is optional in the example above)


## migrations

  http://edgeguides.rubyonrails.org/active_record_migrations.html
