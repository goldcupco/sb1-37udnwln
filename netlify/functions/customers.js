const supabase = require('./db');

exports.handler = async (event, context) => {
  try {
    const { httpMethod, path } = event;
    const id = event.path.split('/').pop();

    switch (httpMethod) {
      case 'GET':
        if (path.includes('/customers/') && id !== 'customers') {
          const { data, error } = await supabase
            .from('customers')
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
            .from('customers')
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
        const newCustomer = JSON.parse(event.body);
        const { data: created, error: createError } = await supabase
          .from('customers')
          .insert([newCustomer])
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
        if (!id || id === 'customers') {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Customer ID is required' })
          };
        }
        const updates = JSON.parse(event.body);
        const { data: updated, error: updateError } = await supabase
          .from('customers')
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
        if (!id || id === 'customers') {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Customer ID is required' })
          };
        }
        const { error: deleteError } = await supabase
          .from('customers')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ message: 'Customer deleted successfully' })
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