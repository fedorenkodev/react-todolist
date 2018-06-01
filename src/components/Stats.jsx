import React from 'react';

function Stats({todos}) {
  let total = todos.length;
  let done = todos.filter(todo => todo.completed).length;
  let left = total - done;
  
  return(
    <table className="stats">
      <tbody>
        <tr>
          <th>Tasks:</th>
          <td>{total}</td>
        </tr>
        <tr>
          <th>Done:</th>
          <td>{done}</td>
        </tr>
        <tr>
          <th>Left:</th>
          <td>{left}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Stats;