module.exports=function parseIni(content)
{
     const lins = content.replace(/ /g, "");
    const lines=lins.split("\n");
    const obj = {};
    let name;
    let values;
    const  category= [];
    const name_value =[];
    let compteur =0;
    let numero_category;
    for (const line of lines) {
    compteur++;
        if (line.match(/^([[\w].+]$)/gm)) {
            const intituler = line.slice(1, line.length - 1);
            category.push([intituler, compteur]);
        }

        if (line.match(/(^[\w]+)(.+)/gm) && line !== "") {

            const text = line.slice(0, line.length);
            const item = text.split("=");

            if(category[category.length-1][1] < compteur)
            {
                numero_category=category[category.length-1][0];
            }

            //name
           name=item[0];

            //values
            if (item[1].match(/^([\w].+);(.+)/gm)) {
                const commentaire = item[1].split(";");

                if (commentaire[0].match(/^([\w]+)(.+)/gm)) {
                    values=commentaire[0].slice(0, commentaire[0].length - 1);
                }
                else {
                    values=commentaire[0];
                }
            }
            else
            {
                values=item[1];
            }
            if (item.length > 2) {
                const start = item[0].length;
                values = line.slice(start+1, line.length);
            }
            name_value.push([name, values, numero_category])
        }
    }

    // calculate number element of table
    function nb_element_category(category)
    {
        let compt =0;

        for (const tb of name_value)
        {
            if (tb[2] === category)
            {
                compt++;
            }

        }
        return compt;
    }

    let compteurs=-1;
    let i =0;
    let element=0;
    for (const tb of category)
    {
        let json_value = [];
        compteurs++;
        let nb_element =nb_element_category(category[compteurs][0]);
        if(compteurs !== 0) {
        element=nb_element+element;
        i=element-nb_element;
        }
        else
            {
                element=nb_element;
            }
        for (i; i<element;i++) {
            let key_value = {};
           key_value[name_value[i][0]]=name_value[i][1];
           json_value.push(key_value);
           obj[category[compteurs][0]] = json_value;
        }
        if(nb_element === 0)
        {
            obj[category[compteurs][0]]=json_value;
        }
        if(tb[0]=== "exif")
        {
            json_value = [];
            obj[category[compteurs][0]]=json_value;
        }
    }
    return JSON.stringify(obj, null, 4);
}