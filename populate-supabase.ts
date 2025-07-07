// TypeScript script to populate Supabase with all data
import { db } from './server/db.js';
import postgres from 'postgres';

// Supabase connection
const supabaseSql = postgres('postgresql://postgres:0852Tsie*@db.izkihpjkykultfshgqve.supabase.co:5432/postgres');

async function populateSupabase() {
  try {
    console.log('🚀 Starting Supabase data population...');

    // Get all data from local database
    const categories = await db.select().from('categories').orderBy('id');
    const subcategories = await db.select().from('subcategories').orderBy('id'); 
    const products = await db.select().from('products').orderBy('id');
    const users = await db.select().from('users').where('username', '=', 'admin');

    console.log(`📊 Local data counts:
    - Categories: ${categories.length}
    - Subcategories: ${subcategories.length} 
    - Products: ${products.length}
    - Users: ${users.length}`);

    // Clear Supabase tables
    await supabaseSql`DELETE FROM products`;
    await supabaseSql`DELETE FROM subcategories`;
    await supabaseSql`DELETE FROM categories`;
    await supabaseSql`DELETE FROM users`;

    // Insert categories
    for (const cat of categories) {
      await supabaseSql`INSERT INTO categories (id, name, description, image, slug) VALUES (${cat.id}, ${cat.name}, ${cat.description}, ${cat.image}, ${cat.slug})`;
    }

    // Insert subcategories
    for (const sub of subcategories) {
      await supabaseSql`INSERT INTO subcategories (id, name, description, slug, category_id, icon) VALUES (${sub.id}, ${sub.name}, ${sub.description}, ${sub.slug}, ${sub.categoryId}, ${sub.icon})`;
    }

    // Insert products
    for (const prod of products) {
      await supabaseSql`INSERT INTO products (
        id, name, description, price, image, images, 
        category_id, subcategory_id, featured, rating, 
        in_stock, key_features
      ) VALUES (
        ${prod.id}, ${prod.name}, ${prod.description}, 
        ${prod.price}, ${prod.image}, ${prod.images}, 
        ${prod.categoryId}, ${prod.subcategoryId}, 
        ${prod.featured}, ${prod.rating}, ${prod.inStock}, 
        ${prod.keyFeatures}
      )`;
    }

    // Insert admin user
    for (const user of users) {
      await supabaseSql`INSERT INTO users (
        id, username, password, role, email, first_name, 
        last_name, phone, address, city, postal_code, created_at
      ) VALUES (
        ${user.id}, ${user.username}, ${user.password}, 
        ${user.role}, ${user.email}, ${user.firstName}, 
        ${user.lastName}, ${user.phone}, ${user.address}, 
        ${user.city}, ${user.postalCode}, ${user.createdAt}
      )`;
    }

    // Verify Supabase data
    const supabaseCategories = await supabaseSql`SELECT COUNT(*) as count FROM categories`;
    const supabaseSubcategories = await supabaseSql`SELECT COUNT(*) as count FROM subcategories`;
    const supabaseProducts = await supabaseSql`SELECT COUNT(*) as count FROM products`;
    const supabaseUsers = await supabaseSql`SELECT COUNT(*) as count FROM users`;

    console.log(`✅ Supabase populated successfully:
    - Categories: ${supabaseCategories[0].count}
    - Subcategories: ${supabaseSubcategories[0].count}
    - Products: ${supabaseProducts[0].count}  
    - Users: ${supabaseUsers[0].count}`);

    console.log('\n🎉 All data successfully transferred to Supabase!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await supabaseSql.end();
    process.exit(0);
  }
}

populateSupabase();