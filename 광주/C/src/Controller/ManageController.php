<?php

namespace src\Controller;

use src\App\DB;

class ManageController extends Controller
{
    // 주문
    public function order()
    {
        $result = DB::fetchAll("SELECT * FROM `reserve` ORDER BY rdate DESC");
        $this->render('manageOrder', ['result' => $result]);
    }

    //판매
    public function sale()
    {
        $this->render('manageSale');
    }
    //판매현황 차트 데이터 불러오기
    public function date()
    {
        extract($_POST);

        $firstChart = DB::fetchAll("SELECT
        age_range,
        start_date,
        end_date,
        product,
        MAX(quantity) AS max_quantity
    FROM
        (
            SELECT
                r.product,
                m.age,
                DATE_FORMAT(r.okdate, ?) AS start_date,
                DATE_FORMAT(r.okdate, ?) AS end_date,
                COUNT(*) AS quantity,
                CASE
                    WHEN m.age BETWEEN 10 AND 19 THEN '10대'
                    WHEN m.age BETWEEN 20 AND 29 THEN '20대'
                    WHEN m.age BETWEEN 30 AND 39 THEN '30대'
                    WHEN m.age BETWEEN 40 AND 49 THEN '40대'
                    ELSE '기타'
                END AS age_range
            FROM
                reserve r
                JOIN member m ON r.name = m.name
            WHERE
                r.okdate IS NOT NULL
            GROUP BY
                r.product,
                age_range,
                start_date,
                end_date
        ) subquery
    GROUP BY
        age_range,
        start_date,
        end_date
    ORDER BY
        age_range ASC,
        max_quantity DESC", [$start, $end]);

        // 두번쨰 차트
        $secondChart = DB::fetchAll(" SELECT
        m.area,
        subquery.start_date,
        subquery.end_date,
        subquery.product,
        subquery.max_quantity
    FROM
        (
            SELECT
                r.product,
                m.area,
                DATE_FORMAT(r.okdate, ?) AS start_date,
                DATE_FORMAT(r.okdate, ?) AS end_date,
                COUNT(*) AS quantity,
                MAX(COUNT(*)) OVER (PARTITION BY m.area) AS max_quantity
            FROM
                reserve r
                JOIN member m ON r.name = m.name
            WHERE
                r.okdate IS NOT NULL
                AND m.age >= 10 AND m.age <= 49 
            GROUP BY
                r.product,
                m.area,
                start_date,
                end_date
        ) subquery
    JOIN member m ON subquery.area = m.area
    WHERE
        subquery.quantity = subquery.max_quantity
    GROUP BY
        m.area,
        subquery.start_date,
        subquery.end_date
        ", [$start, $end]);
        $ten = DB::fetchAll("SELECT r.*, m.* FROM reserve r JOIN member m ON r.name = m.name INNER JOIN ( SELECT m.area, MAX(r.quantity) AS max_quantity FROM reserve r JOIN member m ON m.name = r.name WHERE m.age >= 10 AND m.age <= 19 AND r.state ='구매확정' GROUP BY m.area ) r2 ON m.area = r2.area AND r.quantity = r2.max_quantity WHERE m.age >= 10 AND m.age <= 19 AND r.state ='구매확정' GROUP BY m.area ORDER BY r.quantity DESC");
        $locals = DB::fetchAll("SELECT area FROM `member` GROUP BY area");

        $this->render('manageSale', [
            'firstChart' => $firstChart,
            'secondChart' => $secondChart,
            'locals' => $locals,
            'ten' => $ten,
            'start' => $start,
            'end' => $end
        ]);
    }

    // 구매 확정 
    public function ok()
    {
        extract($_GET);

        if (!isset($idx)) {
            msg("잘못된 접근입니다.");
            return;
        }

        $search = DB::fetch("SELECT `state` FROM `reserve` WHERE idx=?", [$idx]);

        if ($search->state != "구매확정") {
            DB::fetch("UPDATE `reserve` SET `state`='구매확정', `okdate`=NOW() WHERE idx=?", [$idx]);
            msgAndGo("성공적으로 구매확정 되었습니다.", "/manageOrder");
        } else {
            msg("이미 구매확정된 주문입니다.");
        }

    }

}