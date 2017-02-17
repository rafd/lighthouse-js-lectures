class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.text :email
      t.timestamps
    end

    create_table :posts do |t|
      t.text :content
      t.references :user, index: true, foreign_key: true
      t.timestamps
    end

    create_table :replies do |t|
      t.text :content
      t.references :user, index: true, foreign_key: true
      t.references :post, index: true, foreign_key: true
      t.timestamps
    end
  end
end
