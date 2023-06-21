-- get all vacancies found for the user to show as notification, by this user's Id
SELECT
    *
FROM
    System_User AS u
    JOIN Search_Query AS s ON u.Id = s.User_Id
    JOIN Search_Query_Vacancy_HH AS sv ON s.Id = sv.Search_Query_Id
    JOIN Vacancy_HH AS v ON v.Id = sv.Vacancy_Id
WHERE
    u.Id = $1
    AND EXTRACT(
        epoch
        FROM
            s.last_aknowledged
    ) - s.Notify_Posted_Sec_Ago_Max <= EXTRACT (
        epoch
        FROM
            -- v.created_at::timestamp
            v.Modified
    )
ORDER BY
    v.Modified DESC