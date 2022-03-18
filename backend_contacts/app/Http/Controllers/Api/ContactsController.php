<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
//use App\Http\Requests\ContactRequest;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $contact = User::orderBy('name', 'asc')->get();
        return response()->json([
            'statusCode' => 200,
            'code' => 'ALL_CONTACTS',
            'contacts' => $contact
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        Log::debug("====>>>".$request);
        try {
            DB::beginTransaction();
            $user = new User([
                'name'=> $request->name,
                'lastName'=> $request->lastName,
                'email'=> $request->email,
                'phone'=> $request->phone,
                'gender'=> $request->gender,
                'date'=> $request->date,

            ]);
            $user->save();
            DB::commit();
            return response()->json([
                'statusCode' => 200,
                'code' => 'SUCCESS_STORE_USER',
                'message' => 'user saved successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'statusCode' => 500,
                'code' => 'ERROR_STORE_USER',
                'message' => 'error saving user',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */


    public function show($id)
    {
        $user = User::find($id);

        

        if (isset($user)) {
            return response()->json([
                'statusCode' => 200,
                'code' => 'USER_FOUND',
                'message' => 'user found',
                'contact' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'lastName' => $user->lastName,
                    'email' => $user->email,
                    'date' => $user->date,
                    'phone' => $user->phone,
                    'gender' => $user->gender,
                ]
            ], 200);
        }
        return response()->json([
            'statusCode' => 404,
            'code' => 'USER_NOT_FOUND',
            'message' => 'error finding user',
            'contact' => [
                'id' => $user->id,
                'name' => $user->name,
                'lastName' => $user->lastName,
                'email' => $user->email,
                'date' => $user->date,
                'phone' => $user->phone,
                'gender' => $user->gender,

            ]
        ], 404);
    }

    public function edit($id)
    {
        $user = User::find($id);

        if (isset($user)) {
            return response()->json([
                'statusCode' => 200,
                'code' => 'USER_FOUND',
                'message' => 'user found',
                'user' => $user
            ], 200);
        }
        return response()->json([
            'statusCode' => 404,
            'code' => 'USER_NOT_FOUND',
            'message' => 'error finding user',
            'user' => $user,
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);
            DB::beginTransaction();
            $user->name = $request->name;
            $user->lastName = $request->lastName;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->gender = $request->gender;
            $user->date = $request->date;
            $user->save();

            DB::commit();
            return response()->json([
                'statusCode' => 200,
                'code' => 'SUCCESS_UPDATE_USER',
                'message' => 'user updated successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'statusCode' => 500,
                'code' => 'ERROR_UPDATE_USER',
                'message' => 'error updating user',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            if (isset($user)) {
                $user->delete();
                return response()->json([
                    'statusCode' => 200,
                    'code' => 'SUCCESS_DELETE_USER',
                    'message' => 'user deleted successfully',
                ], 200);
            }
            return response()->json([
                'statusCode' => 404,
                'code' => 'USER_NOT_FOUND',
                'message' => 'error finding user',
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'code' => 'ERROR_DELETE_USER',
                'message' => 'error deleting user',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
