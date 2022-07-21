const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('test2.db');
let sql = `
select unit.name ,unit.id,songs.title, songs.level, songs.combo
from unit inner join songs
on unit.id=songs.unit_id;
 `
 db.serialize( () => {
db.all( sql, (error, row) => {
if(error) {
console.log('Error: ', error );
return;
}
 for( let data of row ) {
console.log( data.name + ' : ' + data.title + ' : ' + data.level + ' : ' + data.combo);
  }
});
});
