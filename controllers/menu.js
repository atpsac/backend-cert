const { response, request } = require('express');
const db = require('../database/db');

const menuGet = async (req = request, res = response) => {
    const sql = `WITH RECURSIVE menuCTE (MenuId, Menu_ParentId, Level, MenuName, Path)
    AS
        (
        SELECT MenuId, Menu_ParentId, Level, MenuName, CAST(MenuName AS NCHAR) AS Path
        FROM   menu
        WHERE  Menu_ParentId IS NULL
        UNION ALL
        SELECT c.MenuId, c.Menu_ParentId, c.Level, c.MenuName, CONCAT( P.Path, '>', c.MenuName ) AS Path
        FROM   menuCTE P
                INNER JOIN menu c ON P.MenuId=c.Menu_ParentId
        )
SELECT * FROM menuCTE ORDER BY MenuId;`;
    // WHERE rm.Menu_MenuId = menuCTE.MenuId
    // AND rm.Role_RoleId = 1

    try {
        const result = await db.query(sql);
        //let objMenu = {};
        const [...data] = result;
        let parentNode = null;
        let node = null;
        // console.log(dataResult);

        // for (let [position1, item1] of result.entries()) {
        //     let { Level: level1, MenuId: menuId1 } = item1;
        //     // Level 1
        //     if (level1 === 1) {

        //         objMenu[`Item${position1 + 1}`] = item1;

        //         for (let [position2, item2] of result.entries()) {
        //             let { Level: level2, MenuId: menuId2, Menu_ParentId: parentId2 } = item2;
        //             // Level 2                    
        //             if (level2 === 2 && parentId2 === menuId1) {

        //                 item1[`SubMenuId${position2 + 1}`] = item2;

        //                 // Level 3
        //                 for (let [position3, item3] of result.entries()) {
        //                     let { Level: level3, Menu_ParentId: parentId3 } = item3;
        //                     // Level 2                    
        //                     if (level3 === 3 && parentId3 === menuId2) {

        //                         item2[`SubMenuId${position3 + 1}`] = item3;

        //                         // Level 3

        //                     }
        //                 }
        //             }
        //         }
        //     }

        // }


        res.json({
            objMenu
        });




        // console.log(fields);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    menuGet
};