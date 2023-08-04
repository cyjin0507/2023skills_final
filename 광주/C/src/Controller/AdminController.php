<?php

namespace src\Controller;

use src\App\DB;

class AdminController
{
    public function orderPage()
    {
        $orderList = DB::fetchAll("SELECT r.*, d.price as dprice FROM reserve r, data d where r.product = d.product order by rdate desc");
        view('admin/order', ['orderList' => $orderList]);
    }

    public function graphPage()
    {
        extract($_GET);

        // 연령대별
        $data = DB::fetchAll("SELECT 
        age_group,
        product,
        MAX(purchase_count) AS max_quantity
    FROM (
        SELECT 
            R.product,
            M.age,
            CASE
                WHEN M.age <= 19 THEN '10대'
                WHEN M.age BETWEEN 20 AND 29 THEN '20대'
                WHEN M.age BETWEEN 30 AND 39 THEN '30대'
                WHEN M.age BETWEEN 40 AND 49 THEN '40대'
                ELSE '50이상'
            END AS age_group,
            COUNT(*) AS purchase_count
        FROM
            reserve R
        JOIN
            member M ON R.idx = M.idx
        WHERE
            R.okdate BETWEEN ? AND ?
        GROUP BY
            R.product, M.age, age_group
    ) AS purchase_counts
    GROUP BY
        age_group", [$start, $end]);

        $data2 = DB::fetchAll("WITH ranked_data AS 
        ( SELECT m.area AS region, r.product, SUM(r.quantity) 
        AS total_quantity, ROW_NUMBER() 
        OVER(PARTITION BY m.area ORDER BY SUM(r.quantity) DESC) AS rank 
        FROM reserve r JOIN member m ON r.idx = m.idx 
        WHERE m.area IN ('강원도', '경기도', '경상남도', '경상북도', 
        '전라남도', '전라북도', '제주도', '충청남도', '충청북도') 
        AND r.okdate BETWEEN ? AND ? GROUP BY region, r.product ) 
        SELECT region, product, total_quantity FROM ranked_data 
        WHERE rank = 1 ORDER BY region, total_quantity DESC", [$start, $end]);

        view('admin/graph', ['data' => $data, 'data2' => $data2]);
    }

    public function productDecide($idx)
    {
        $data = DB::execute("UPDATE reserve SET state='구매확정' WHERE idx=?", [$idx]);
        if ($data) {
            back("구매확정 되었습니다.");
        }
    }
}
