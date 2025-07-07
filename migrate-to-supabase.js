// Migration script to transfer data from local database to Supabase
import postgres from 'postgres';

// Local database connection
const localSql = postgres(process.env.DATABASE_URL);

// Supabase connection  
const supabaseSql = postgres('postgresql://postgres:0852Tsie*@db.izkihpjkykultfshgqve.supabase.co:5432/postgres');

async function migrateData() {
  try {
    console.log('Starting data migration to Supabase...');

    // 1. Migrate Categories
    console.log('Migrating categories...');
    const categories = await localSql`SELECT * FROM categories ORDER BY id`;
    for (const category of categories) {
      await supabaseSql`
        INSERT INTO categories (id, name, description, image, slug)
        VALUES (${category.id}, ${category.name}, ${category.description}, ${category.image}, ${category.slug})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          slug = EXCLUDED.slug
      `;
    }
    console.log(`✅ Migrated ${categories.length} categories`);

    // 2. Migrate Subcategories
    console.log('Migrating subcategories...');
    const subcategories = await localSql`SELECT * FROM subcategories ORDER BY id`;
    for (const sub of subcategories) {
      await supabaseSql`
        INSERT INTO subcategories (id, name, description, slug, category_id, icon)
        VALUES (${sub.id}, ${sub.name}, ${sub.description}, ${sub.slug}, ${sub.category_id}, ${sub.icon})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          slug = EXCLUDED.slug,
          category_id = EXCLUDED.category_id,
          icon = EXCLUDED.icon
      `;
    }
    console.log(`✅ Migrated ${subcategories.length} subcategories`);

    // 3. Migrate Products
    console.log('Migrating products...');
    const products = await localSql`SELECT * FROM products ORDER BY id`;
    for (const product of products) {
      await supabaseSql`
        INSERT INTO products (
          id, name, description, price, image, images, 
          category_id, subcategory_id, featured, rating, 
          in_stock, key_features
        )
        VALUES (
          ${product.id}, ${product.name}, ${product.description}, 
          ${product.price}, ${product.image}, ${product.images}, 
          ${product.category_id}, ${product.subcategory_id}, 
          ${product.featured}, ${product.rating}, ${product.in_stock}, 
          ${product.key_features}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          image = EXCLUDED.image,
          images = EXCLUDED.images,
          category_id = EXCLUDED.category_id,
          subcategory_id = EXCLUDED.subcategory_id,
          featured = EXCLUDED.featured,
          rating = EXCLUDED.rating,
          in_stock = EXCLUDED.in_stock,
          key_features = EXCLUDED.key_features
      `;
    }
    console.log(`✅ Migrated ${products.length} products`);

    // 4. Migrate Admin User
    console.log('Migrating admin user...');
    const users = await localSql`SELECT * FROM users WHERE username = 'admin'`;
    for (const user of users) {
      await supabaseSql`
        INSERT INTO users (id, username, password, role, email, first_name, last_name, phone, address, city, postal_code, created_at)
        VALUES (${user.id}, ${user.username}, ${user.password}, ${user.role}, ${user.email}, ${user.first_name}, ${user.last_name}, ${user.phone}, ${user.address}, ${user.city}, ${user.postal_code}, ${user.created_at})
        ON CONFLICT (id) DO UPDATE SET
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          role = EXCLUDED.role,
          email = EXCLUDED.email,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          phone = EXCLUDED.phone,
          address = EXCLUDED.address,
          city = EXCLUDED.city,
          postal_code = EXCLUDED.postal_code
      `;
    }
    console.log(`✅ Migrated ${users.length} admin users`);

    // Verify migration
    console.log('\nVerifying migration...');
    const supabaseCategories = await supabaseSql`SELECT COUNT(*) as count FROM categories`;
    const supabaseSubcategories = await supabaseSql`SELECT COUNT(*) as count FROM subcategories`;
    const supabaseProducts = await supabaseSql`SELECT COUNT(*) as count FROM products`;
    const supabaseUsers = await supabaseSql`SELECT COUNT(*) as count FROM users`;

    console.log(`📊 Supabase now has:`);
    console.log(`   - ${supabaseCategories[0].count} categories`);
    console.log(`   - ${supabaseSubcategories[0].count} subcategories`);
    console.log(`   - ${supabaseProducts[0].count} products`);
    console.log(`   - ${supabaseUsers[0].count} users`);

    console.log('\n🎉 Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await localSql.end();
    await supabaseSql.end();
  }
}

migrateData();