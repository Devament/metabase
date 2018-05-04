(ns metabase.query-processor.middleware.bind-effective-timezone
  (:require [metabase.util.date :as ud]))

(defn bind-effective-timezone
  [qp]
  (fn [query]
    (ud/with-effective-timezone (:database query)
      (qp query))))
