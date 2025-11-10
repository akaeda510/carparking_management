class RemovePasswordDigestAndAddEncryptedPasswordToParkingManagers < ActiveRecord::Migration[7.1]
  def change
    # 1. 既存の has_secure_password 用カラムを削除
    remove_column :parking_managers, :password_digest, :string

    # 2. Devise 用の必須カラムを追加
    add_column :parking_managers, :encrypted_password, :string, null: false, default: ""
  end
end
