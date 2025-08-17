import EditUserProfile from '@/components/buttons/edit-user-profile';
import { getUserFromCookies } from '@/libs/helper';
import { Avatar } from '@radix-ui/themes';

export default async function page() {
   const user = await getUserFromCookies(); 
   
   return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b">
            <div className="flex max-sm:flex-col max-sm:gap-5 sm:items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar
                    size="6"
                    src={user?.avatar || ""}
                    alt='avatar'
                    radius="full"
                    fallback={user?.name?.charAt(0) || "U"}
                  />
                </div>
                <div>
                  <h1 className="text-3xl max-sm:text-2xl font-bold">{user?.name}</h1>
                  <p className="text-lg opacity-70">{user?.username}</p>
                  <div className="mt-2">
                    <span className="px-3 py-1 rounded-full text-sm font-medium border">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {user?.role != "guest" ? <EditUserProfile user={user} toEdit='Edit Profile'/> : null}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Personal Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Personal Information</h2>
                  <div className="space-y-6">
                    <div className="flex max-sm:flex-col sm:items-center justify-between py-3 border-b">
                      <span className="font-medium">FullName</span>
                      <span>{user?.name}</span>
                    </div>
                    <div className="flex max-sm:flex-col sm:items-center justify-between py-3 border-b">
                      <span className="font-medium">Email Address</span>
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex max-sm:flex-col sm:items-center justify-between py-3 border-b">
                      <span className="font-medium">Username</span>
                      <span>{user?.username}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Account Details</h2>
                  <div className="space-y-6">
                    <div className="flex max-sm:flex-col sm:items-center justify-between py-3 border-b">
                      <span className="font-medium">User ID</span>
                      <span className="font-mono text-sm">{user?.id}</span>
                    </div>
                    <div className="flex max-sm:flex-col sm:items-center justify-between py-3 border-b">
                      <span className="font-medium">Role</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium border w-fit">
                        {user?.role}
                      </span>
                    </div>
                    <div className="py-3 border-b">
                      <div className="flex max-sm:flex-col sm:items-center justify-between">
                        <span className="font-medium">Avatar URL</span>
                        <span className="text-sm text-right max-w-xs break-all w-fit">
                          {user?.avatar || "NA"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
