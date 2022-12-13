const bcrypt = require('bcryptjs')
const xss = require('xss')

const GridService = {
  getIDS: async function (db) {
	try {
		let result = await db.raw('SELECT id FROM maze_data LIMIT 5')	
		return result.rows;
	} catch (e) {
		return e;
	}
   
  },
  getMaze: async function (db, id) {
	try {
		let result = await db.raw(`SELECT * FROM maze_data WHERE id='${id}'`);
		return result.rows
	} catch (e) {
		return e;
	}
  },
  getAllMazes : async function (db) {
    let result = await db.raw('SELECT * FROM maze_data');
    return result.rows;
  },
  deleteMaze: async function (db, id) {
    return await db.raw(`DELETE FROM maze_data WHERE id='${id}'`)
  },
  insertMaze: async function(db, mazeObj) {

    let walls = '{';
    mazeObj['walls'].forEach( (item, index) => {
        walls +=  `{${item[0]}, ${item[1]}}`;
        walls += (index < mazeObj['walls'].length-1)?',':'';
    })
    walls += '}';
    // let insertObj = {
    //     hero: `{${mazeObj['hero'][0]}, ${mazeObj['hero'][1]}}`,
    //     token1: `{${mazeObj['token1'][0]}, ${mazeObj['token1'][1]}}`,
    //     token2: `{${mazeObj['token2'][0]}, ${mazeObj['token2'][1]}}`,
    //     token3: `{${mazeObj['token3'][0]}, ${mazeObj['token3'][1]}}`,
    //     token4: `{${mazeObj['token4'][0]}, ${mazeObj['token4'][1]}}`,
    //     walls,
    //     c: mazeObj['c'],
    //     r: mazeObj['r']
    // }
    //console.log("insert object from insert maze in grid service", insertObj)
	 //   '{${mazeObj['token1'][0]}, ${mazeObj['token1'][1]}}', 
    //   '{${mazeObj['token2'][0]}, ${mazeObj['token2'][1]}}', 
    //   '{${mazeObj['token3'][0]}, ${mazeObj['token3'][1]}}', 
    //   '{${mazeObj['token4'][0]}, ${mazeObj['token4'][1]}}', 
	//token1, token2, token3, token4, 
	console.log("query: ")
    let query = `INSERT INTO maze_data (hero, walls, c, r) VALUES (
      '{${mazeObj['hero'][0]}, ${mazeObj['hero'][1]}}', 
      '${walls}', 
      '${mazeObj['c']}', 
      '${mazeObj['r']}')`;
	console.log('query = ', query, db.raw)
    let result = await db.raw(query);
	console.log('result = ', result)
    return result.rows;
  }

}

module.exports = GridService
