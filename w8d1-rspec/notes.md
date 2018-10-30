## Testing Review

  testing
  automated testing
  levels-of-testing: unit, integration, functional/end-to-end
  TDD 
  BDD


# Testing Rails w/ RSPec

## Set Up

```rails new -T name-of-app```

rspec rails instructions: https://github.com/rspec/rspec-rails

add gem to Gemfile:

```
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'rspec-rails' # <--- line to add
end
```

```bundle install```

```rails generate rspec:install```

## Creating New Specs

rspec generators: https://relishapp.com/rspec/rspec-rails/docs/generators

```rails generate model widget``` (will also create spec files)

or just the tests:

```rails generate rspec:model widget```

## Writing Specs

lots and lots of matchers:
https://relishapp.com/rspec/rspec-expectations/v/3-5/docs/built-in-matchers/be-matchers

```
RSpec.describe CreditCard, type: :model do
  context "new" do
    before :each do 
      @init_limit = 5000
      @cc = CreditCard.new(@init_limit)
    end

    it "returns a CreditCard instance" do
      expect(@cc).to be_a(CreditCard)
    end

    it "can read limit" do
      expect(@cc.limit).to eq(@init_limit)
    end

    # ...
 end
end
```

## Running Tests

```bundle exec rspec```

can also run a subset of tests:

https://relishapp.com/rspec/rspec-core/v/2-12/docs/command-line/tag-option

```bundle exec rspec --tag type:model```

## Organizing Tests

 - Usually have:
   - 1 spec per class (unit tests)
      - only test the "interface" (public methods) not the "implementation"
   - tests typically have:
      - set-up ("given", before :each)
      - the test ("when" + "then") 
      - clean-up (after :each)
   - extra specs for interactions between classes, different contexts, happy path, bugs etc.

## Feature Testing

check out capybara: http://teamcapybara.github.io/capybara/
