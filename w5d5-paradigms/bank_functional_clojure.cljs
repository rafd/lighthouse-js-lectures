; you can run this file with lumo
;   brew install lumo
; then: lumo bank_functional_clojure.cljs

; setup

(require '[clojure.string :refer [join]])

(defn create-account [owner]
  {:owner owner
   :balance 0
   :transactions []})

(defn deposit [account amount]
  (-> account
      (update :balance + amount)
      (update :transactions conj (str "D" amount))))

(defn withdraw-base [account amount]
  (-> account
      (update :balance - amount)
      (update :transactions conj (str "W" amount))))

(defn to-string [account]
  (str (account :owner) ": "
       "$" (account :balance)
       "\n\t"
       (join "\n\t" (account :transactions))
       "\n"))

(defn withdraw-savings
  [account amount]
  (if (< 0 (- (account :balance) amount))
    (withdraw-base account amount)
    (update account :transactions conj (str "W" amount "X"))))

(defn create-savings-account [owner]
  (assoc (create-account owner)
    :type :savings))

(defn withdraw [account amount]
  (case (account :type)
    :savings (withdraw-savings account amount)
    (withdraw-base account amount)))


; program

(def account-abc
  (atom (create-savings-account "Bob")))

(reset! account-abc (deposit @account-abc 500))
(reset! account-abc (withdraw @account-abc 100))
(reset! account-abc (withdraw @account-abc 1000))

(println (to-string @account-abc))

; or

(-> (create-savings-account "Bob")
    (deposit 500)
    (withdraw 100)
    (withdraw 1000)
    to-string
    println)


