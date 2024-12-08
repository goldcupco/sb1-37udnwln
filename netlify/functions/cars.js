const supabase = require('./db');

exports.handler = async (event, context) => {
  try {
    const { httpMethod, path } = event;
    const id = event.path.split('/').pop();

    switch (httpMethod) {
      case 'GET':
        if (path.includes('/cars/') && id !== 'cars') {
          const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
          };
        } else {
          const { data, error } = await supabase
            .from('cars')
            .select('*');
          
          if (error) throw error;
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
          };
        }

      case 'POST':
        const newCar = JSON.parse(event.body);
        const { data: created, error: createError } = await supabase
          .from('cars')
          .insert([newCar])
          .select()
          .single();
        
        if (createError) throw createError;
        return {
          statusCode: 201,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(created)
        };

      case 'PUT':
        if (!id || id === 'cars') {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Car ID is required' })
          };
        }
        const updates = JSON.parse(event.body);
        const { data: updated, error: updateError } = await supabase
          .from('cars')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(updated)
        };

      case 'DELETE':
        if (!id || id === 'cars') {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Car ID is required' })
          };
        }
        const { error: deleteError } = await supabase
          .from('cars')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'Car deleted successfully' })
        };

      case 'OPTIONS':
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
          },
          body: ''
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};