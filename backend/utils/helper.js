
const helper =  {
     getLastDigits : (number) =>{
        return (number % 1000000).toString().padStart(6, '0');
      },
     currentYear : new Date().getFullYear(),
      formatDate : (data) => {
        const date = new Date(data);
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const dateParts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);
    
        const monthFull = dateParts.find(p => p.type === 'month').value;
      const monthShort = monthFull.slice(0, 3); // Take the first three characters
      
        const formattedDate = `${monthShort} ` +
                              `${dateParts.find(p => p.type === 'day').value}, ` +
                              `${dateParts.find(p => p.type === 'year').value}`;
      
        return formattedDate;
      },

}

module.exports = helper;
